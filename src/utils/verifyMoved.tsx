
const verifyMoved = (previous: [number, number], current: [number, number]) => {
    let verification = false
    //difference between current and previous location
    let xChange = previous[1] - current[1]
    let yChange = previous[0] - current[0]
    //getting absolute value of difference
    if (xChange < 0) {
        xChange *= -1
    }
    if (yChange < 0) {
        xChange *= -1
    }
    //finding hyptoneuse^2 of distance travelled
    let inRadius = Math.pow(xChange, 2) + Math.pow(yChange, 2)
    //comparing hypotoneuse^2 to radius^2 
    if (inRadius > Math.pow(0.0003, 2)) {
        verification = true
    }
    return verification
}

export default verifyMoved