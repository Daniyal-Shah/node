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
    author: authorSchema,
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

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
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

// createAuthor("Daniyal", "My bio", "Mywebsite.com");

// createCourse(
//   "Course1",
//   new Author({ name: "Daniyal", bio: "My bio", website: "Mywebsite.com" })
// );

// listCourses();

updateAuthor("62210b51b24e6c4392289894");
