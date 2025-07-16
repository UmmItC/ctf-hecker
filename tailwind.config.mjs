/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				// Anime Purple Theme
				accent: {
					DEFAULT: '#c084fc',
					dark: '#9333ea',
					bright: '#e879f9',
				},
				purple: {
					primary: '#8b5cf6',
					secondary: '#a855f7',
				},
				pink: {
					accent: '#ec4899',
				},
				cosmic: {
					blue: '#3b82f6',
				},
				dark: {
					bg: 'rgb(20, 15, 35)',
					'bg-darker': 'rgb(10, 8, 20)',
					card: 'rgb(30, 25, 50)',
				},
				text: {
					light: '#f1e8ff',
					muted: '#c4b5fd',
					purple: '#ddd6fe',
				}
			},
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
				'mono': ['Fira Code', 'ui-monospace', 'monospace'],
			},
			borderRadius: {
				'xl': '16px',
			},
			boxShadow: {
				'magical': '0 8px 32px rgba(139, 92, 246, 0.15), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(196, 132, 252, 0.2)',
				'magical-hover': '0 16px 48px rgba(139, 92, 246, 0.25), 0 8px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(196, 132, 252, 0.3)',
				'glow-purple': '0 0 15px rgba(196, 132, 252, 0.3)',
				'glow-pink': '0 0 15px rgba(236, 72, 153, 0.3)',
				'glow-blue': '0 0 15px rgba(59, 130, 246, 0.3)',
			},
			backgroundImage: {
				'magical-gradient': 'linear-gradient(135deg, #c084fc, #ec4899, #3b82f6)',
				'cosmic-gradient': 'linear-gradient(135deg, rgb(10, 8, 20) 0%, rgb(20, 15, 35) 100%)',
				'card-gradient': 'radial-gradient(circle, rgba(196, 132, 252, 0.1) 0%, transparent 70%)',
			},
			animation: {
				'magical-shimmer': 'magical-shimmer 3s ease-in-out infinite alternate',
				'twinkle': 'twinkle 2s infinite',
				'cosmic-drift': 'cosmic-drift 60s linear infinite',
				'cursor-pulse': 'cursor-pulse 1.2s infinite',
				'magical-entry': 'magical-entry 0.6s ease-out',
			},
			keyframes: {
				'magical-shimmer': {
					'0%, 100%': { 
						filter: 'brightness(1) drop-shadow(0 0 15px #c084fc)',
						'background-position': '0% 50%',
					},
					'50%': { 
						filter: 'brightness(1.2) drop-shadow(0 0 25px #ec4899)',
						'background-position': '100% 50%',
					},
				},
				'twinkle': {
					'0%, 100%': { opacity: '1', transform: 'scale(1)' },
					'50%': { opacity: '0.7', transform: 'scale(1.1)' },
				},
				'cosmic-drift': {
					'0%': { transform: 'translate(0, 0) rotate(0deg)' },
					'100%': { transform: 'translate(-80px, -80px) rotate(360deg)' },
				},
				'cursor-pulse': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' },
				},
				'magical-entry': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)',
						filter: 'blur(10px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
						filter: 'blur(0)',
					},
				},
			},
		},
	},
	plugins: [],
}