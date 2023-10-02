class PublicProfileDTO {
  constructor(user) {
    this.name = user.name;
    this.username = user.username;
    this.description = user.description;
    this.image = user.image;
    if (user.socialLinks) {
      this.socialLinks = user.socialLinks;
    }
    for (let contact of user.contactInfo) {
      this.contactInfo = contact.value;
    }
    if (user.completedCourses) {
      this.completedCourses = user.inscribedCourses;
    }
    if (user.achievements) {
      this.achievements = user.achievements;
    }
  }

  static get selectFields() {
    return [
      "name",
      "username",
      "description",
      "image",
      "socialLinks",
      "contactInfo",
      "inscribedCourses",
      "achievements",
    ];
  }
}
