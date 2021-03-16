export class Utils {
  static replaceAndSnake(value) {
    return value.replace(/ /g, '_').toLowerCase();
  }
  static openDialog(data, message, snackBar) {
    snackBar.open(message, 'Close', {
      duration: 5000,
    });
  }
}
