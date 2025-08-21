import { db } from '../../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, deleteDoc, doc } from 'firebase/firestore';

export async function saveUserFlow({ userId, prompt, flow_json, flow_type, product_name }) {
  try {
    const docRef = await addDoc(collection(db, 'user_flows'), {
      user_id: userId,
      prompt,
      flow_json,
      flow_type,
      product_name,
      created_at: new Date().toISOString(),
    });
    return { id: docRef.id };
  } catch (error) {
    return { error: error };
  }
}

export async function getUserFlows(userId) {
  try {
    const q = query(
      collection(db, 'user_flows'),
      where('user_id', '==', userId),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return { data };
  } catch (error) {
    return { error: error };
  }
}

export async function deleteUserFlow(flowId) {
  try {
    await deleteDoc(doc(db, 'user_flows', flowId));
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}
