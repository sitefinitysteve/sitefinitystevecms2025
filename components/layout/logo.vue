<template>
	<div id="header__logo" class="company-logo">
		<div class="flex-shrink-0 flex items-center">
			<nuxt-link to="/" class="flex items-center">
				<!--.cls-1{fill:#f57400;}.cls-2{fill:#b3b3b3;}.cls-3{fill:#4d4d4d;}.cls-4{fill:#fff;}-->
				<svg data-name="Layer 1" viewBox="0 0 150 145" xmlns="http://www.w3.org/2000/svg" class="h-10 w-auto mr-3">
				<circle fill="#f57400" transform="translate(-41.34 75.33) rotate(-45)" cx="82.5" cy="78.5" r="72.5"/>
				<path fill="#fff" transform="translate(-10 -6)" d="M125.75,22.82c-.52,4-6.71,10.27-12.33,12.9-3.29-2.78-12-4.73-19-3.71-5,.78-11.87,1.58-18.07,9.42a20.3,20.3,0,0,0-4,12.73c1.21,10.33,13,14.5,24,19.34,10,4.36,19.43,9,20.59,18.94.53,4.49-1.8,11.68-5.59,16.47-13.09,16.55-32.91,28-50.46,30-10.14,1.18-18.67-.79-22.41-5.69.32-5.77,4.33-13.75,10.33-18.2a23,23,0,0,0,24.14,13.79c7.22-.85,17.36-5.39,22.34-11.9,2.92-3.7,4.89-8.87,4.37-13.36-1.12-9.56-10.16-14.23-20-18.62-11.06-5-22.9-10-24.24-21.49-.66-5.65.37-10.32,4.7-15.57C70.25,35,89,24.53,110.24,22.06A45.22,45.22,0,0,1,125.75,22.82Z"/>
				</svg>
				<span class="company-name">SitefinitySteve</span>
			</nuxt-link>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.company-logo {
	.company-name {
		font-family: $font-accent;
		font-size: $font-size5;
		font-weight: 600;
		color: $base-color;
		letter-spacing: 0.5px;
		
		@include media(xsm) {
			font-size: $font-size6;
		}
	}
}
</style>
