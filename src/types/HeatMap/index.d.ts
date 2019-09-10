declare module "HeatMap" {
	/**
	 * date: Date,
	 * count: number
	 */
	interface Point {
		date: Date
		count: number
	}

	/**
	 * count: number,
	 * color: string,
	 * text: string (optional)
	 */
	interface Color {
		count: number
		color: string
		text?: string
	}

	/**
	 * animate: Boolean,
	 * duration: Date (optional)
	 */
	interface Animation {
		animate: boolean
		duration?: number
	}

	/**
	 * count: number,
	 * color: string,
	 * text: string (optional),
	 * date: Date,
	 * count: number,
	 * i: number (optional)
	 */
	interface D3Data {
		i?: number
		count?: number
		color?: string
		text?: string
		date?: Date
	}
}
