---
title: 'Step-by-Step Guide to Install Arch Linux from Scratch (Minimal System)'
description: 'Guide for helping people to install Arch Linux from scratch, resulting in a minimal system. Not including the installation of a desktop environment :)'
pubDate: 'Jul 14 2025'
---

## Introduction

This comprehensive guide will walk you through the process of installing Arch Linux from start to finish, resulting in a minimal system. Please note that this guide will not cover the installation of a desktop environment.

Before you begin, it's assumed that you have a basic understanding of computer operations and are familiar with using a virtual machine or have a spare computer for the installation of Arch Linux. The process of booting the Arch Linux ISO will not be covered in this guide.

### Before You Begin

Arch Linux operates on a philosophy of simplicity, user control, and customization. Unlike more user-friendly distributions such as Linux Mint or Ubuntu, Arch does not provide a graphical user interface (GUI) during the installation process. Instead, it relies heavily on the command line.

If you are new to GNU/Linux or have less than a year of experience, it is advisable to gain some familiarity with GNU/Linux basics before attempting an Arch installation.

In Arch, every step of the installation process is executed through the command line. This direct exposure to the terminal allows for greater control but may be challenging if you are uncomfortable with command-line operations.

## Check the Connection

Before starting the installation, ensure that you have a working internet connection. You can verify your connection by using the `ping` command:

```shell
ping archlinux.org
```

### Network Connection via Wireless (Wi-Fi)

If you are using a wireless connection, you can connect to a Wi-Fi network using the `iwctl` command, which is part of the iwd package installed by default on the official Arch Linux ISO.

To start the `iwctl` command, enter:

```shell
iwctl
```

Then, use the following commands to connect to your Wi-Fi network:

```shell
[iwd]# device list
[iwd]# station wlan0 scan
[iwd]# station wlan0 get-networks
[iwd]# station wlan0 connect [SSID]
```

After successfully connecting to the Wi-Fi network, exit the `iwctl` command by typing `exit`. You can then check your connection again using the `ping` command.

## Partition Setup

Before installing Arch Linux, you need to partition your disk. You can use tools like `cfdisk`, `fdisk`, or `gdisk` for this purpose. In this guide, we will use `gdisk`.

### Using gdisk

First, list the available disks:

```shell
lsblk
```

Next, use `gdisk` to partition the disk:

```shell
gdisk /dev/sda
```

Create the following partitions:

1. Type `o` to create a new GPT partition table.
2. Type `n` to create a new partition, then press `Enter` to accept the default first sector.
3. Type `+500M` for the last sector and `ef00` for the partition type (EFI System).
4. Type `n` to create another partition, accept the default first sector, type `+30G` for the last sector, and `8300` for the partition type (Linux filesystem).
5. Repeat the previous step to create a third partition with `+25G` for the last sector and `8300` for the partition type (Linux filesystem).
6. Finally, create a fourth partition, accept the default first sector, type `+4.5G` for the last sector, and `8200` for the partition type (Linux swap).

After creating the partitions, type `w` to write the changes to the disk. You should now have the following partitions:

| Size   | Type                | Code  |
|--------|---------------------|-------|
| 500M   | EFI System          | ef00  |
| 30G    | Linux filesystem     | 8300  |
| 25G    | Linux filesystem     | 8300  |
| 4.5G   | Linux swap          | 8200  |

## Parition Format

Before installing Arch Linux, you need to format the partitions. We will use the `mkfs` command for this purpose.

First, format the EFI System partition, which is used for the boot loader:

```shell
mkfs.fat -F32 /dev/sda1
```

Next, format the root and home partitions with the ext4 filesystem:

```shell
mkfs.ext4 /dev/sda2
mkfs.ext4 /dev/sda3
```

Finally, format the swap partition using the `mkswap` command:

```shell
mkswap /dev/sda4
swapon /dev/sda4
```

### Mount the Partitions

Now, mount the partitions to the `/mnt` directory, starting with the root partition:

```shell
mount /dev/sda2 --mkdir /mnt
```

Next, mount the home partition:

```shell
mount /dev/sda3 --mkdir /mnt/home
```

>TIPS: The efi partition will not be mounted here, we'll mount it after chrooting into the new system.

## Install Basic Arch System

Let's install the basic Arch Linux system with the `pacstrap` command.

```shell
pacstrap -i /mnt base base-devel linux linux-headers linux-firmware vim networkmanager sudo
```

## Generate File System Table (fstab)

Generate the file system table, This table is used by the system to determine how to mount the partitions.

```shell
genfstab -U /mnt >> /mnt/etc/fstab
```

## Switching new system

Switch to the new system by using `arch-chroot`:

```shell
arch-choot /mnt
```

## Update the root password

Your root password is not set by default, so you need to set it:

```shell
passwd
```

## Add a new user

Create a new normal user:

```shell
useradd -m <username>
```

Set the password for the new user:

```shell
passwd <username>
```

Add permissions to the new user:

```shell
usermod -aG wheel,storage,power <username>
```

## Apply new user permissions

We will give the new user permissions to use `sudo`:

```shell
EDITOR=vim visudo
```

Uncomment the following line:

```shell
%wheel ALL=(ALL:ALL) ALL`:
```

Set timeout to 0, so you don't need to wait every time for the password delay:

```shell
Defaults timestamp_timeout=0
```

## System Language

We will set the system language to English (US) UTF-8 and generate the locale.

```shell
vim /etc/locale.gen
```

Find `en_US.UTF-8 UTF-8` and remove the `#` symbol to uncomment it. and save the file.

Generate the locale:

```shell
locale-gen
```

Set the system language:

```shell
echo LANG=en_US.UTF-8 > /etc/locale.conf
```

## Hostname Settings

Set the hostname:

```shell
echo Archlinux > /etc/hostname
```

Edit the hosts file:

```shell
vim /etc/hosts
```

Add the following lines:

```shell
127.0.0.1      localhost
::1            localhost
127.0.0.1      Archlinux.localdomain    localhost
```

## Timezone Sync

Set the timezone:

```shell
ln -sf /usr/share/zoneinfo/Asia/Taipai /etc/localtime
```

Sync the hardware clock:

```shell
hwclock --systohc
```

## Mount EFI Partition

It's time to mount the EFI partition to `/boot/efi`.

```shell
mount /dev/sda1 --mkdir /boot/efi
```

### Bootloader configuration

Install GRUB and efibootmgr for UEFI systems:

```shell
pacman -S grub efibootmgr
```

Install GRUB for UEFI systems for the first time:

```shell
grub-install --target=x86_64-efi --efi-directory=/boot/efi
```

Generate the GRUB configuration file:

```shell
grub-mkconfig -o /boot/grub/grub.cfg
```

## Enable Internet Service

It's essential to enable the NetworkManager service to have internet access after rebooting the system.

```shell
systemctl enable NetworkManager.service
```

## Exit the chroot environment

As for the setup of minimal Arch Linux, we are done now :) Let's exit the chroot environment.

```shell
exit
```

## Reboot

Reboot to enjoy your new Arch Linux system :)

```shell
reboot
```

## Conclusion

Arch linux is a great distribution for those who want to learn more about Linux and have a more personalized experience. The installation process might be challenging, but it's a rewarding journey that allows you to build a system tailored to your preferences.

After you master the arch linux, you should now feel more comfortable with the command line and have a understanding of how a GNU/Linux system works and also as well as the ability to troubleshoot issues that may arise.

For more hardcores, you can try to install Gentoo or LFS (Linux From Scratch) to further deepen your knowledge of GNU/Linux.

But before that, you should feel arch is simple and easy to use. otherwise, these two distributions will be a nightmare for you. Since they are a source based distribution, you need to compile everything from the source code. and the configuration is more difficult than Arch Linux.
