//To Understand mongodb relationships

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongo-relationships", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate("author", "name -_id")
    .select("name author");
  console.log(courses);
}

//  $set is used to edit/set sub document
//  $unset is used to remove sub document

async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    { $set: { "author.name": "John Smith" } }
  );

  console.log(course);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

// createAuthor("Daniyal", "My bio", "Mywebsite.com");

// createCourse(
//   "Course1",
//   new Author({ name: "Daniyal", bio: "My bio", website: "Mywebsite.com" })
// );

// listCourses();

// updateAuthor("62210b51b24e6c4392289894");

// createCourse("Course1", [
//   new Author({ name: "Daniyal" }),
//   new Author({ name: "Mosh" }),
//   new Author({ name: "Amy" }),
// ]);

// addAuthor("62210f3d956183b939518b83", new Author({ name: "New added" }));

// removeAuthor("62210f3d956183b939518b83", "62210f3d956183b939518b82");
