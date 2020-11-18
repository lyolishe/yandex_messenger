import {Router} from "../src/modules/Router";
import {Form} from "../src/modules/components/Form/Form";
import Block from "../src/modules/components/Block";
import {Button} from "../src/modules/components/Button/Button";

describe('router test', () => {
    test('expect router from different rootQuery to be equal', () => {
        const router = new Router('abc')
        expect(router).toEqual(new Router('test1'))
    });
})


describe('Form element test', () => {
    test('expect Form element creating correct form items from certain template with correct initial values', () => {
        const id = "test text"
        const formtmpl = `<formitem data-name="id" data-label="test label" data-type="text"></formitem>`
        const form = new Form({id: "test", initialValues: {id}}, formtmpl)
        const input = (form.element as HTMLFormElement).elements[0]

        expect(form.element.tagName).toEqual("FORM");
        expect(input.tagName).toEqual("INPUT")
        expect(input.id).toEqual("id")
        expect((input as HTMLInputElement).value).toEqual(id)
    })
})


describe('Base Block test', () => {
    const tagName = 'div';
    const classList = ['myClass', 'anotherClass'];
    const tmpl = `<a href="/someTrash.img">broken link</a>`;
    const block = new Block(tagName, {classList}, tmpl);

    test('checking tag name, class list and inner html to be correct', () => {
        expect(block.element.tagName.toLowerCase()).toEqual(tagName);
        expect(block.element.innerHTML).toBe(tmpl);
        expect(block.element.className).toEqual(classList.join(' '))
    });

    test('check hidability of the block', () => {
        block.hide();
        expect(block.element.style.display).toBe('none');
    })

    test('check visability of the block', () => {
        block.show();
        expect(block.element.style.display).toBe('block');
    })

    test('checking how i can change props', () => {
        const newClassList = ['something', 'another']
        block.setProps({classList: newClassList})
        expect(block.element.className).toEqual(newClassList.join(' '))
    })
})


describe('button test', () => {
    const fn = jest.fn();
    const button = new Button({type: "button", onClick: fn, text: ""});

    test('check if i can click on the button and if there are a correct text', ()=> {
        button.element.click()
        expect(fn.mock.calls.length).toEqual(1)
        expect(button.element.innerHTML.trim()).toEqual("")
    });

    test('checking if the text was changed an i still can click the button', () => {
        const buttonText = "test text";
        button.setProps({...button.props, text: buttonText});
        button.element.click();
        expect(button.element.innerHTML.trim()).toEqual(buttonText);
        expect(fn.mock.calls.length).toEqual(2);
    })
})


