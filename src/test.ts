type Result = "pass" | "fail"
 
function verify(result: Result = "fail") {
  if (result === "pass") {
    console.log("Passed")
  } else {
    console.log("Failed")
  }
}