import Vue from "vue";

export function formatDate(date: string, format = "DD MMMM YYYY"): string {
  return Vue.prototype.$date(date).format(format);
}
