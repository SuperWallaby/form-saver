import { Serial, serializeArray } from './lib/serial';
import { LocalManager } from '@superwallaby/local-storage-manager';

export interface FormSaverConfig<Keys extends string> {
  formId: string;
  defaultKey: Keys;
  onSave?: () => void;
  onLoad?: () => void;
  onCover?: () => boolean;
  onError?: (e: any) => void;
}

export class FormSaver<Keys extends string> {
  form: HTMLElement;
  saveKey: Keys;
  localManager: LocalManager<Keys>;

  public onLoad = () => {};
  public onSave = () => {
    alert('데이터가 저장 되었습니다.');
  };
  public onCover = () =>
    confirm(
      '저장된 정보가 이미 있습니다. 데이터를 저장하면 이전 데이터는 사라집니다.'
    );
  public onError = (e: any) => {
    console.error(e);
    throw Error(e);
    return;
  };

  constructor(config: FormSaverConfig<Keys>) {
    console.log('LocalManager');
    console.log(LocalManager);
    this.localManager = new LocalManager<Keys>({
      storage: 'localStorage',
    });
    this.form = document.getElementById(config.formId);
    this.saveKey = config.defaultKey;
    if (config.onSave) this.onSave = config.onSave;
    if (config.onLoad) this.onLoad = config.onLoad;
    if (config.onCover) this.onCover = config.onCover;
    if (config.onError) this.onError = config.onError;
  }

  public save = (data: Serial[], key?: Keys) => {
    try {
      this.localManager.saveLocal(key || this.saveKey, data);
      this.onSave();
    } catch (e) {
      console.error(e);
      throw Error();
    }
  };

  public saveData = async (key?: Keys) => {
    var data = serializeArray(this.form);
    try {
      if (localStorage.getItem(key || this.saveKey)) {
        if (this.onCover()) {
          this.save(data, key);
        }
      } else this.save(data, key);
    } catch (e) {
      alert("Can't save Data :(");
      throw Error(e);
    }
  };

  public set = (data: Serial) => {
    var name = data['name'];
    var value = data['value'];
    const target = document.getElementsByName(name)[0];
    const isCheckBox = target.getAttribute('type') === 'checkbox';
    const isSelectBox = target.tagName === 'SELECT';
    const isTextArea = target.tagName === 'TEXTAREA';

    if (isSelectBox) {
      const selectBox = target as HTMLSelectElement;
      for (var i = 0, n = selectBox.options.length; i < n; i++) {
        const target = selectBox.options[i];
        if (target.value === value) target.selected = true;
      }
    } else if (isCheckBox) {
      // @ts-ignore
      target.checked = true;
    } else if (isTextArea) {
      if (target.innerHTML) target.innerHTML = value;
      else if (target.innerText) target.innerText = value;
      // @ts-ignore
      target.value = value;
    } else target.setAttribute('value', value);
  };

  public loadData = (key?: Keys) => {
    try {
      const data = this.localManager.getLocalObj(key || this.saveKey, null);
      data.forEach(this.set);
      this.onLoad();
    } catch (e) {
      this.onError(e);
    }
  };
}

// @ts-ignore
window.FormSaver = FormSaver;

export default FormSaver;
