import User from "src/model/User"

describe("User", () => {
    test("getIsAvailable() should return the current isAvailable value", () => {
        const user = new User({id: "", name: "", surname: "", email: ""}, false, false)
        const isAvailable = user.getIsAvailable()
        expect(isAvailable).toEqual(user["isAvailable"])
    })
    
    test("setIsAvailable() should set the isAvailable value", () => {
        const user = new User({id: "", name: "", surname: "", email: ""}, false, false)
        const isAvailable = true
        user.setIsAvailable(isAvailable)
        expect(user["isAvailable"]).toEqual(isAvailable)
    })
})