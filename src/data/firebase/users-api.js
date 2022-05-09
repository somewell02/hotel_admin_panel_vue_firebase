import { ref, onUnmounted } from "vue";
import { firestore } from "./firebase.js";

const usersCollection = firestore.collection("users");

export const getUsers = () => {
  const users = ref([]);
  const close = usersCollection.onSnapshot((snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  onUnmounted(close);
  return users;
};

export const getUserById = async (id) => {
  const user = await usersCollection.doc(id).get();
  return user.exists ? user.data() : null;
};

export const addUser = async (
  first_name,
  last_name,
  patronumic,
  role,
  phone,
  email
) => {
  const user = {
    firstName: first_name,
    lastName: last_name,
    patronumic: patronumic,
    role: role,
    phone: phone,
    email: email,
  };
  await usersCollection.add(user);
};

export const updateUser = async (
  id,
  first_name,
  last_name,
  patronumic,
  role,
  phone,
  email
) => {
  await usersCollection.doc(id).update({
    firstName: first_name,
    lastName: last_name,
    patronumic: patronumic,
    role: role,
    phone: phone,
    email: email,
  });
};

export const deleteUser = (id) => {
  return usersCollection.doc(id).delete();
};