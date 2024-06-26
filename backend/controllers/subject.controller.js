import { subjectsModel } from "../models/subject.model.js";

export class SubjectController {
  static async createSubject(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.role;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ msg: "You don't have permission for this funcionality" });
      }

      const { name, teacher_id } = req.body; // Extracts subject data from the request body

      // Validates if the required fields are empty
      // Isn't it better to search by registration number, instead of ID?
      if (!name) {
        return res.status(404).send({ msg: "Missing required fields" }); // Returns a 400 status with a message if any required field is empty
      }

      // Checks if the subject already exists in the database by name
      const subjectExists = await subjectsModel
        .findOne({ name })
        .populate("teacher_id");
      if (subjectExists) {
        return res.status(400).json({ Error: "Subject already exists" }); // Returns a 400 status if the subject already exists
      }

      // Checks if the teacher exists in the database and get the name
      // const teacher = await subjectsModel.findById(teacher_id);
      // console.log(teacher_id);
      // console.log(teacher);
      // if (!teacher) {
      //   return res.status(404).json({ Error: "Teacher not found" }); // Returns a 404 status if the teacher is not found
      // }

      const newSubject = {
        // Creates a new subject object
        name,
        // teacher_id: teacher_id || null,
        teacher_id: teacher_id || null,
      };

      // Creates a new subject in the database
      // const response = await subjectsModel.create(newSubject);
      // console.log(response);
      await subjectsModel.create(newSubject);

      return res.status(201).send({ msg: "Subject created successfully!" }); // Returns a 201 status indicating successful creation
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an erroror message if an erroror occurs
    }
  }

  static async readSubjects(req, res) {
    try {
      // Finds all subjects in the database
      const subjects = await subjectsModel.find();

      if (subjects.length === 0) {
        return res
          .status(200)
          .json({ message: "No subjects found", subjects: [] });
      }

      return res.status(200).send(subjects); // Returns a 200 status with the found subjects
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an erroror message if an erroror occurs
    }
  }

  static async readSubjectById(req, res) {
    try {
      // Checks if the user logged in is an admin
      // const isAdmin = req.payload.role;
      // if (isAdmin !== "admin") {
      //   return res
      //     .status(403)
      //     .send({ msg: "You don't have permission for this funcionality" });
      // }

      // Finds only a user in the database
      const id = req.params.id;
      const subject = await subjectsModel.findById(id, "-__v");
      if (!subject) return res.status(404).json({ Error: "Subject not found" }); // Returns a 404 status if the subject is not found

      return res.status(200).json(subject); // Returns a 200 status with the found subject
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an erroror message if an erroror occurs
    }
  }

  static async updateSubject(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.role;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ msg: "You don't have permission for this funcionality" });
      }

      const id = req.params.id; // Retrieves the id parameter from the request

      // Checks if the subject exists
      const subjectExists = await subjectsModel.findById(id);
      if (!subjectExists) {
        return res.status(404).json({ msg: "Subject not found" }); // Returns a 404 status with a message if the subject doesn't exist
      }

      // Updates the subject with the provided id using the data from the request body
      await subjectsModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(200).send({ msg: "Succesfully updated" }); // Returns a 200 status with the updated subject
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an erroror message if an erroror occurs
    }
  }

  static async deletedSubject(req, res) {
    try {
      // Checks if the user logged in is an admin
      const isAdmin = req.payload.role;
      if (isAdmin !== "admin") {
        return res
          .status(403)
          .send({ msg: "You don't have permission for this funcionality" });
      }

      const id = req.params.id; // Retrieves the id parameter from the request

      // Checks if the subject exists
      const subjectExists = await subjectsModel.findById(id);
      if (!subjectExists) {
        return res.status(404).json({ msg: "Subject not found" }); // Returns a 404 status with a message if the subject doesn't exist
      }

      // Deletes the subject with the provided id
      await subjectsModel.findByIdAndDelete(id);

      return res.status(200).send({ msg: "Successfully deleted" }); // Returns a 200 status with the deleted subject
    } catch (error) {
      console.log({ Error: `${error.message}` });
      return res.status(500).json({ Error: `${error.message}` }); // Returns a 500 status with an erroror message if an erroror occurs
    }
  }
}
