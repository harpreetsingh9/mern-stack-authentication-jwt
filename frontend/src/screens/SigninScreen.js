import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router";

function SigninScreen() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await Axios.post("/api/users/signin", {
      email,
      password,
    });
    const res = JSON.stringify(data);
    console.log(res);
    history.push("/profile");
    // Axios.post("/api/users/register", {
    //   email,
    //   password,
    // })
    //   .then((res) => history.push("/profile"))
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // if (result.status === 422 || !data) {
    //   window.alert("Email already exits");
    //   console.log("Email exit");
    // } else {
    //   window.alert("data post successfull");
    // }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={submitHandler}>
        <FormControl>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default SigninScreen;
