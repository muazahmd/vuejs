<template>
  <div id="app" class="container">
    <h1>User Form</h1>

    <form @submit="submitForm">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label for="name">First Name:</label>
            <input type="text" id="name" class="form-control" v-model="formData.fname" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="name">Last Name:</label>
            <input type="text" id="name" class="form-control" v-model="formData.lname" />
          </div>
        </div>

        <div class="col-6">
          <div class="form-group">
            <label for="email">Father Name:</label>
            <input type="text" id="email" class="form-control" v-model="formData.father_name" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" class="form-control" v-model="formData.email" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="selectField">Education:</label>
        <select style="border-radius: 0%" v-model="formData.education" id="selectField" class="form-control">
          <option value="">Choose an option...</option>
          <option value="Master">Master</option>
          <option value="Bachelor">Bachelor</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Matric">Matric</option>
        </select>
      </div>
      <div class="form-group">
        <label for="address">Address:</label>
        <textarea id="address" class="form-control" v-model="formData.address" rows="4"></textarea>
      </div>


      <button style="border-radius: 0%" type="submit" class="btn btn-primary my-4">
        {{ isInsertMode ? "Submit" : "Update" }}
      </button>
    </form>


    <div class="overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <!-- <th scope="col">Id</th> -->
            <th scope="col">F Name</th>
            <th scope="col">F Last</th>
            <th scope="col">Father Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <!-- <th scope="row">{{ user._id }}</th> -->
            <td>{{ user.fname }}</td>
            <td>{{ user.lname }}</td>
            <td>{{ user.father_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.address }}</td>
            <td>
              <a class="btn" @click="updateUser(user._id)"><i style="color: blue"
                  class="fa-sharp fa-regular fa-pen-to-square"></i></a>
              <a class="btn" @click="deleteUser(user._id)"><i style="color: red" class="fa-solid fa-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axiosClient from "../axiosClient";
import { toast } from 'vue3-toastify';

export default {
  name: "userForm",
  setup() {
  },
  data() {
    return {
      statusMode: "insert",
      userData: [],
      users: [],
      formData: {
        fname: "",
        lname: "",
        father_name: "",
        education: "",
        email: "",
        address: "",
        _id: "",
      },
      selectedFile: null,
    };
  },
  async mounted() {
    this.fetchUsers();
  },
  computed: {
    isInsertMode() {
      return this.statusMode == "insert" ? true : false;
    },
  },
  methods: {
    showToatWarning() {
      toast.warning('Wow warning!', {
        autoClose: 1000,
      });
    },
    showToatSuccess(msg) {
      toast.success(msg, {
        autoClose: 1000,
        position: 'top-center'

      });
    },
    showToatInfo() {
      toast.info('Wow info!', {
        autoClose: 1000,
      });
    },
    async fetchUsers(id = null) {
      if (id == null) {
        let result = await axiosClient.get("http://localhost:3000/api/v1/user");
        this.users = result.data.Data;
      } else {
        let result = await axiosClient.get(`http://localhost:3000/api/v1/user/${id}`);
        this.formData = result.data.Data;
      }
    },
    async updateUser(id) {
      this.statusMode = "update";
      console.log(id)
      this.fetchUsers(id);
    },
    async deleteUser(id) {
      let result = null;
      result = await axiosClient.delete(`http://localhost:3000/api/v1/user/${id}`);
      if (result.status == 200) {
        this.showToatSuccess("user deleted successfully")
        this.fetchUsers();

      }
    },
    async submitForm(event) {
      event.preventDefault();
      let result = null;


      if (this.isInsertMode)
        result = await axiosClient.post('http://localhost:3000/api/v1/user', this.formData)
      else
        result = await axiosClient.put(`http://localhost:3000/api/v1/user/${this.formData._id}`, this.formData)
      if (result.status == 201 || result.status == 200) {
        this.fetchUsers();
        if (this.isInsertMode)
          this.showToatSuccess("user updated successfully")
        else
          this.showToatSuccess("user updated successfully")


      }
      this.formData = {
        fname: '',
        lname: '',
        father_name: '',
        email: '',
        address: '',
        _id: ''
      };

      this.statusMode = 'insert'
    },
  },
};
</script>
