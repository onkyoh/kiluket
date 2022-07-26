
const verifyMoved = (previous: [number, number], current: [number, number]) => {
    if (previous) {
       let xChange = previous[1] - current[1]
        let yChange = previous[0] - current[0]
        if ((xChange || yChange > 0.0003) || (xChange || yChange < -0.0003)) {
            return true
        }
    }
    return false
}

export default verifyMoved