declare module 'HeatMap' {
  /**
   * date: Date,
   * count: number
   */
  interface IPoint {
    date: Date
    count: number
  }

  /**
   * count: number,
   * color: string,
   * text: string (optional)
   */
  interface IColor {
    count: number
    color: string
    text?: string
  }

  /**
   * animate: Boolean,
   * duration: Date (optional)
   */
  interface IAnimation {
    animate: Boolean
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
  interface ID3Data {
    i?: number
    count?: number
    color?: string
    text?: string
    date?: Date
  }
}