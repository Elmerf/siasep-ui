import Vue from "vue";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");
Object.defineProperties(Vue.prototype, {
  $date: {
    get() {
      return dayjs;
    },
  },
});
