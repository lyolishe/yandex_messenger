import Block, {DefaultBlockProps} from "../Block.js";

export type PageProps = {
    menuItemId: string | null
}

export class Page extends Block<PageProps>{
   constructor(props: DefaultBlockProps<PageProps>) {
       super('div', {...props});
   }

    createPage(): void {

   }
}