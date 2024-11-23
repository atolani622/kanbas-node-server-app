import * as dao from "./dao.js";
import * as modulesDao from "../Modules/dao.js"
import * as assignmentsDao from "../Assignments/dao.js"

export default function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  });

  app.delete("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  });

  app.put("/api/courses/:courseId", (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  });

  app.get("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const modules = modulesDao.findModulesForCourse(courseId);
    res.json(modules);
  });

  app.post("/api/courses/:courseId/modules", (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = modulesDao.createModule(module);
    res.send(newModule);
  });

  app.get("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", (req, res) => {
    const { courseId } = req.params;
    const assignments = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = assignmentsDao.createAssignment(assignments);
    res.send(newAssignment);
  });

  app.post("/api/courses/:courseId/enroll", (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body; 
    dao.enrollUserInCourse(userId, courseId);
    res.send({ message: "User enrolled successfully!" });
  });

  app.post("/api/courses/:courseId/unenroll", (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.body;
    const success = dao.unenrollUserFromCourse(userId, courseId);
    if (success) {
      res.send({ message: "User unenrolled successfully!" });
    } else {
      res.status(404).send({ message: "Enrollment not found!" });
    }
  });

  app.get("/api/users/:userId/enrollments", (req, res) => {
    const { userId } = req.params;
    const courses = dao.findEnrollmentsForUser(userId);
    res.send(courses);
  });



  





}
