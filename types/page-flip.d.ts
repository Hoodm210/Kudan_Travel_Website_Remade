declare module "page-flip" {
  export class PageFlip {
    constructor(element: HTMLElement, options: Record<string, any>);
    loadFromHTML(items: HTMLElement[] | NodeListOf<Element>): void;
    turnToPage(page: number): void;
    flip(page: number): void;
    flipNext(): void;
    flipPrev(): void;
    getPageCount(): number;
    on(event: string, callback: (e: any) => void): void;
    destroy(): void;
  }
}