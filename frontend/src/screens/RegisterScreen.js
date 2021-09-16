import React, { useState } from "react";
import { FormControl, InputLabel, Input, Button } from "@material-ui/core";
import Axios from "axios";
import { useHistory } from "react-router";

function RegisterScreen() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const { data } = await Axios.post("/api/users/register", {
      name,
      email,
      password,
    });
    const res = JSON.stringify(data);
    console.log(res);
    history.push("/profile");

    // Axios.post("/api/users/register", {
    //   name,
    //   email,
    //   password,
    // })
    //   .then((res) => history.push("/profile"))
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // console.log(data);

    // const result = data.json();
    // console.log(result);
    // if (result.status === 422 || !data) {
    //   window.alert("Email already exits");
    //   console.log("Email exit");
    // } else {
    //   window.alert("data post successfull");
    // }
  };

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <FormControl>
          <InputLabel htmlFor="name">Full Name</InputLabel>
          <Input
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
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
          Register
        </Button>
      </form>
    </div>
  );
}

export default RegisterScreen;
