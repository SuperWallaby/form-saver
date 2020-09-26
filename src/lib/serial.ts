export type Serial = {
  value: any;
  name: string;
};

export const serializeArray = function (form: HTMLElement): Serial[] {
  var arr: any[] = [];
  Array.prototype.slice.call(form).forEach(function (field: any) {
    if (
      !field.name ||
      field.disabled ||
      ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1
    )
      return;
    if (field.type === 'select-multiple') {
      Array.prototype.slice.call(field.options).forEach(function (option: any) {
        if (!option.selected) return;
        arr.push({
          name: field.name,
          value: option.value,
        });
      });
      return;
    }
    if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked)
      return;
    arr.push({
      name: field.name,
      value: field.value,
    });
  });
  return arr;
};
