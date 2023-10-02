// class to show the basic info of a course
export default class CourseListDTO {
  constructor(course) {
    this._id = course._id;
    this.title = course.title;
    this.description = course.description;
    this.price = course.price;
    this.image = course.image;
    this.numberOfStudents = course.numberOfStudents;
    this.rating = course.rating;
  }
}
