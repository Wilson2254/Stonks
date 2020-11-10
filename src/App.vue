<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Gudea:ital,wght@0,400;0,700;1,400&display=swap");

* {
  font-family: "Gudea", sans-serif; 
  margin: 0;
  padding: 0;
  font-weight: 700;
}

#app {
  background: #011936; 
}

.group {
  position: relative;
  margin-bottom: 30px;
}

input {
  font-size: 16px;
  padding: 10px;
  display: block;
  width: 300px;
  border: none;
  border-bottom: 1px solid #ccc;
}
input:focus {
  outline: none;
}
label {
  color: #999;
  font-size: 18px;
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 15px;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}

input:focus ~ label,
input:valid ~ label {
  top: -15px;
  font-size: 14px;
  color: #5264ae;
}

.bar {
  position: relative;
  display: block;
  width: 320px;
}
.bar:before,
.bar:after {
  content: "";
  height: 2px;
  width: 0;
  bottom: 0;
  position: absolute;
  background: #5264ae;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
}
.bar:before {
  left: 50%;
}
.bar:after {
  right: 50%;
}

input:focus ~ .bar:before,
input:focus ~ .bar:after {
  width: 50%;
}
textarea {
  margin-top: 20px;
  width: 280px;
  display: block;
  padding: 10px 10px;
  margin-bottom: 10px;
  background: #e9eff6;
  height: 100px;
  border-width: 0;
  font-family: "Roboto", sans-serif;
  resize: none;
}

button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 30px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #4caf50;
  color: white;
}

.btn:nth-of-type(2) {
  margin-left: 20px;
  background-color: red;
}

.no__task {
  font-size: 24pt;
  color: gray;
}
</style>
