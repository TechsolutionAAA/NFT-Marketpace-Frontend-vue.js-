export default {
  // Prevents toasts of the same type from appearing simultaneously, discarding duplicates
  filterBeforeCreate(toast, toasts) {
    if (toasts.filter(t => t.type === toast.type).length !== 0) {
      // Returning false discards the toast
      return false;
    }
    // You can modify the toast if you want
    return toast;
  }
};
