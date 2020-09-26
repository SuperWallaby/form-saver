# form-saver

form data save and load through localStorage

- Typescript support
- Small dependencies

## Usage

```html
<form id="example">
  <input name="whatever" />
  <textarea name="textArea"></textarea>
  <input name="checkBox" type="checkbox" />
  <select name="selectBox">
    <option value="1">1</option>
    <option value="2">2</option>
  </select>
</form>
```

```ts
const myFormSaver = new window.FormSaver({
  formId: 'example',
  saveKey: 'post',
});

function save() {
  myFormSaver.saveData();
}

function load() {
  myFormSaver.loadData();
}
```

## Args

| Name      |                         Meaning                         |                Type | require |
| --------- | :-----------------------------------------------------: | ------------------: | ------- |
| `formId`  |            DOM form ID target of Management             |            `string` | True    |
| `saveKey` |             Save Key save for localStorage              |            `string` | True    |
| `onSave`  |       When form saved (Message will be override)        |          `()=>void` | False   |
| `onCover` | When try to save in same key (Message will be override) |          `()=>void` | False   |
| `onError` |          When error (Message will be override)          |          `()=>void` | False   |
| `onError` |       When form saved (Message will be override)        | `(e:Error) => void` | False   |

## Methods

### saveData `(key?:string) => void`

will save data in localStorage

### loadData `(key?:string) => void`

will load data from localStorage and give values in form

## AMD

`<script src="https://superwallaby-public-libs.s3.ap-northeast-2.amazonaws.com/form-saver/latest/index.js"></script>`
