import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
class Notification {
  successNotif(message) {
    const $toast = useToast();
    $toast.success(message, { position: top, duration: 1000 });
  }
}

export default new Notification();
