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
			<menu class="main-menu__items">
				<NuxtLink to="/" class="menu-item" prefetch>
					<span>Home</span>
				</NuxtLink>
				<NuxtLink to="/blog" class="menu-item" prefetch>
					<span>Blog</span>
				</NuxtLink>
				<NuxtLink to="/components" class="menu-item" prefetch>
					<span>Components</span>
				</NuxtLink>
			</menu>
		</nav>
	</div>
</template>

<script setup>
const links = ["products", "dynamic-fields", "contact"];
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
		background-color: rgba($black, 0.95);
		z-index: 100;
		padding-top: 6rem;
		overflow-y: auto;
	}
	
	&.is-active {
		display: flex;
		animation: fadeIn 0.3s ease-in-out;
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
		width: 100%;
	}
	
	.menu-item {
		position: relative;
		margin: 0 1rem;
		
		@include media(xsm) {
			margin: 1rem 0;
			width: 80%;
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
				color: $white;
				font-size: $font-size4;
				padding: 1rem;
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
		}
		
		&:hover, &.router-link-active {
			span {
				color: $base-color;
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
		top: 1.5rem;
		right: 1.5rem;
		transform: none;
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
	
	&.is-active {
		.hamburger-line {
			background-color: $white;
			
			&:nth-child(1) {
				transform: translateY(8px) rotate(45deg);
			}
			
			&:nth-child(2) {
				opacity: 0;
			}
			
			&:nth-child(3) {
				transform: translateY(-8px) rotate(-45deg);
			}
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
