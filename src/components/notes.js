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


fetchStudentData = () => {
    fetch('http://localhost:6001/students')
        .then(res => res.json())
        .then(data => this.setState({ students: data }))
}