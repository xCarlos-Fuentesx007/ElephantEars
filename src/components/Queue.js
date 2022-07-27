export default class Queue {
  constructor(arr) {
    this.exercises = arr;
  }

  enqueue(item) {
    this.exercises.push(item);
  }

  dequeue(item) {
    return this.exercises.shift();
  }

  peek() {
    return this.exercises[0];
  }

  getSize() {
    return this.exercises.length;
  }

  isEmpty() {
    return this.getSize() === 0;
  }
}
