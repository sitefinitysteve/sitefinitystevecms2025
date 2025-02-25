<template>
	<header id="header" class="relative w-full py-4 px-6 bg-white shadow-sm">
		<div class="max-w-7xl mx-auto flex items-center justify-between">
			<LayoutLogo class="flex-shrink-0" />
			<NavigationMainMenu class="flex-grow flex justify-center" />
		</div>
	</header>
</template>

<style lang="scss" scoped>
header {
	position: sticky;
	top: 0;
	z-index: 50;
	border-bottom: 3px solid $base-color;
	transition: all 0.3s ease;
	
	@include media(xsm) {
		padding-right: 4rem; // Add space for the hamburger menu
	}
	
	&::after {
		content: '';
		position: absolute;
		bottom: -3px;
		left: 0;
		width: 30%;
		height: 3px;
		background-color: $secondary-color;
	}
}
</style>
