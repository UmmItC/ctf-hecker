<script>
	import { onMount, onDestroy } from 'svelte';
	import 'iconify-icon';

	// Site launch date
	const launchDate = new Date('2025-07-14T01:27:00+08:00');
	let uptimeText = 'Loading...';
	let interval;

	function updateUptime() {
		const now = Date.now();
		const uptime = now - launchDate.getTime();
		
		const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
		const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((uptime % (1000 * 60)) / 1000);
		
		const paddedHours = hours.toString().padStart(2, '0');
		const paddedMinutes = minutes.toString().padStart(2, '0');
		const paddedSeconds = seconds.toString().padStart(2, '0');

		uptimeText = `${days}d ${paddedHours}h ${paddedMinutes}m ${paddedSeconds}s`;
	}

	onMount(() => {
		updateUptime();
		interval = setInterval(updateUptime, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<div class="text-center space-y-3 bg-purple-900/20 backdrop-blur-sm rounded-xl p-6">
	<div class="text-sm text-purple-400 font-mono uppercase tracking-wider flex items-center justify-center gap-2">
		<iconify-icon icon="hugeicons:status" style="color: #8b5cf6;" width="20" height="20" class="animate-spin-slow"></iconify-icon>
		<span>Blog Running Time</span>
	</div>
	<div class="text-2xl font-bold text-purple-300 font-mono tracking-wider" style="text-shadow: 0 0 15px rgba(139, 92, 246, 0.7);">
		{uptimeText}
	</div>
</div> 