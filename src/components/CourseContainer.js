import React, { Component } from "react";
import CourseDetails from "./CourseDetails";
import CourseSelector from "./CourseSelector";
import StudentsList from "./StudentsList";

class CourseContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      courses: [],
      course: [],
      students: []

    }
  }

  componentDidMount() {
    let firstAPICall = fetch('http://localhost:6001/courses')
    let secondAPICall = fetch('http://localhost:6001/students')

    Promise.all([firstAPICall, secondAPICall])
        .then(values => Promise.all(values.map(value => value.json())))
        .then(finalVals => {
            this.setState({ courses: finalVals[0] })
            this.setState({ students: finalVals[1] })
        })
}

  handleClick = (e) => {
    //console.log(e.target.value)
    this.courseInfo(e)
  }

  courseInfo = (e) => {
    const id = e.target.value
    console.log(e.target.value)
    {
      this.state.courses.map((course => {
        if (id === course.id) {
          return {
            course
          }
        }
        this.setState({ course: course }, () =>console.log(this.state.course.name))
      })
      )
    }
  }


  render() {
    return (
      <div className="ui grid container">
        <CourseDetails course={this.state.course}/>
        <CourseSelector courses={this.state.courses} handleClick={this.handleClick}/>
        <StudentsList />
      </div>
    );
  }
}

export default CourseContainer;
