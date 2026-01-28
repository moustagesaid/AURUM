declare module 'gsap' {
  export const gsap: any;
}

declare module 'chart.js' {
  export type ChartConfiguration<TType extends string = string> = any;
  export type ScriptableContext<TType extends string = string> = any;

  export class Chart<TType extends string = string> {
    constructor(ctx: any, config: ChartConfiguration<TType>);
    destroy(): void;
    static register(...items: any[]): void;
  }

  export const registerables: any[];
}


