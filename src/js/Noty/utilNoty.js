export default function createAnNoty(type, text, layout, modal = true) {
  new Noty({
    theme: "nest",
    type: type,
    text: text,
    layout: layout,
    timeout: 2000,
    modal: modal,
  }).show();
}
