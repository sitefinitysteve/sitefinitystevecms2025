<template>
	<div id="main-menu" class="w-full">
		<div id="mobile-menu__toggle-button" @click="toggleMobileMenu()" :class="{ 'is-active': mobileMenuActive }">
			<span class="hamburger">
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</span>
		</div>

		<nav :class="{ 'is-active': mobileMenuActive }">
			<div class="mobile-menu-header">
				<div class="company-logo">
					<nuxt-link to="/" class="flex items-center" @click="toggleMobileMenu()">
						<svg data-name="Layer 1" viewBox="0 0 150 145" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto mr-3">
						<circle fill="#f57400" transform="translate(-41.34 75.33) rotate(-45)" cx="82.5" cy="78.5" r="72.5"/>
						<path fill="#fff" transform="translate(-10 -6)" d="M125.75,22.82c-.52,4-6.71,10.27-12.33,12.9-3.29-2.78-12-4.73-19-3.71-5,.78-11.87,1.58-18.07,9.42a20.3,20.3,0,0,0-4,12.73c1.21,10.33,13,14.5,24,19.34,10,4.36,19.43,9,20.59,18.94.53,4.49-1.8,11.68-5.59,16.47-13.09,16.55-32.91,28-50.46,30-10.14,1.18-18.67-.79-22.41-5.69.32-5.77,4.33-13.75,10.33-18.2a23,23,0,0,0,24.14,13.79c7.22-.85,17.36-5.39,22.34-11.9,2.92-3.7,4.89-8.87,4.37-13.36-1.12-9.56-10.16-14.23-20-18.62-11.06-5-22.9-10-24.24-21.49-.66-5.65.37-10.32,4.7-15.57C70.25,35,89,24.53,110.24,22.06A45.22,45.22,0,0,1,125.75,22.82Z"/>
						</svg>
						<span class="company-name">SitefinitySteve</span>
					</nuxt-link>
				</div>
				<button class="close-button" @click="toggleMobileMenu()">
					<span class="close-icon">✕</span>
				</button>
			</div>
			<menu class="main-menu__items">
				<NuxtLink to="/" class="menu-item" prefetch @click="toggleMobileMenu()">
					<span>HOME</span>
				</NuxtLink>
				<NuxtLink to="/blog" class="menu-item" prefetch @click="toggleMobileMenu()">
					<span>BLOG</span>
				</NuxtLink>
				<NuxtLink to="/components" class="menu-item" prefetch @click="toggleMobileMenu()">
					<span>COMPONENTS</span>
				</NuxtLink>
				<NuxtLink to="/contact" class="menu-item" prefetch @click="toggleMobileMenu()">
					<span>CONTACT</span>
				</NuxtLink>
			</menu>
		</nav>
	</div>
</template>

<script setup>
const mobileMenuActive = ref(false);
const route = useRoute();
watch(route, () => {
	mobileMenuActive.value = false;
});

function toggleMobileMenu() {
	mobileMenuActive.value = !mobileMenuActive.value;
}

watch(
	// closes menu on route change
	() => route.path,
	() => {
		mobileMenuActive.value = false
	}
)
</script>

<style lang="scss" scoped>
#main-menu {
	position: relative;
	width: 100%;
}

nav {
	display: flex;
	justify-content: center;
	width: 100%;
	
	@include media(xsm) {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100vh;
		background-color: #1a1a1a; // Dark background like in the image
		z-index: 100;
		padding: 0;
		overflow-y: auto;
		flex-direction: column;
	}
	
	&.is-active {
		display: flex;
		animation: fadeIn 0.3s ease-in-out;
	}
}

.mobile-menu-header {
	display: none;
	
	@include media(xsm) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		
		.company-logo {
			.company-name {
				font-family: $font-accent;
				font-size: $font-size4;
				font-weight: 600;
				color: #fff;
				letter-spacing: 0.5px;
			}
		}
		
		.close-button {
			background: none;
			border: none;
			cursor: pointer;
			padding: 0.5rem;
			
			.close-icon {
				color: white;
				font-size: 1.5rem;
				font-weight: 300;
			}
		}
	}
}

.main-menu__items {
	display: flex;
	margin: 0;
	padding: 0;
	list-style: none;
	
	@include media(xsm) {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100vh;
		padding: 0;
		margin: 0;
	}
	
	.menu-item {
		position: relative;
		margin: 0 1rem;
		
		@include media(xsm) {
			margin: 0.75rem 0;
			width: 100%;
			text-align: center;
		}
		
		span {
			display: block;
			padding: 0.5rem 0.75rem;
			font-family: $font-accent;
			font-size: $font-size6;
			font-weight: 500;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: $dark-grey;
			transition: color 0.2s ease;
			
			@include media(xsm) {
				color: #fff;
				font-size: $font-size3;
				padding: 0.75rem 1.5rem;
				font-weight: 400;
			}
		}
		
		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			left: 50%;
			width: 0;
			height: 2px;
			background-color: $base-color;
			transition: all 0.3s ease;
			transform: translateX(-50%);
			
			@include media(xsm) {
				display: none; // Remove underline in mobile view
			}
		}
		
		&:hover, &.router-link-active {
			span {
				color: $base-color;
				
				@include media(xsm) {
					color: $base-color;
				}
			}
			
			&::after {
				width: 100%;
			}
		}
		
		&.router-link-active {
			&::after {
				background-color: $secondary-color;
			}
		}
	}
}

// Mobile menu toggle button
#mobile-menu__toggle-button {
	display: none;
	position: absolute;
	top: 50%;
	right: 1rem;
	transform: translateY(-50%);
	z-index: 101;
	cursor: pointer;
	padding: 0.5rem;
	
	@include media(xsm) {
		display: block;
		position: fixed;
		top: 1.25rem;
		right: 1.5rem;
		transform: none;
		
		&.is-active {
			display: none; // Hide hamburger when menu is open
		}
	}
	
	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 24px;
		height: 18px;
		
		.hamburger-line {
			display: block;
			width: 100%;
			height: 2px;
			background-color: $dark-grey;
			transition: all 0.3s ease;
		}
	}
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
