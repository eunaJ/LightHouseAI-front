/**import React, { useEffect, useState } from 'react';
 import { useNavigate, useParams } from 'react-router-dom';
 import axios from 'axios';
 import MyInfo from '../user/MyInfo';

 const BoardUpdate = () => {

 const navigate = useNavigate();
 const [title, setTitle] = useState('');
 const [content, setContent] = useState('');
 const [file, setFile] = useState(null);


 const gotoHome = () => {
 navigate('/');
 }
 const gotoLogin = () => {
 navigate('/login');
 }

 const gotoBoard = () => {
 navigate('/boards');
 }

 const gotoMyBoard = () => {
 navigate('/myboard');
 }

 const gotoMyPage = () => {
 navigate('/mypage');
 }

 const gotoMyTravelContent = () => {
 navigate('/mytravelcontent');
 }
 const backToList = () => {
 navigate('/board');
 };

 const [inputData, setInputData] = useState([{
 idx: '',
 title: '',
 content: '',
 writer: '',
 write_date: ''
 }])

 useEffect(async() => {
 try{
 // 데이터를 받아오는 동안 시간이 소요됨으로 await 로 대기
 const res = await axios.get('http://localhost:8080/api/v1/boards')
 // 받아온 데이터로 다음 작업을 진행하기 위해 await 로 대기
 // 받아온 데이터를 map 해주어 rowData 별로 _inputData 선언
 const _inputData = await res.data.map((board) => ({
 id: board.id,
 writer: rowData.writer,
 write_date: rowData.write_date
 })
 )
 // 선언된 _inputData 를 최초 선언한 inputData 에 concat 으로 추가
 setInputData(inputData.concat(_inputData))
 } catch(e){
 console.error(e.message)
 }
 },[])


 const updateBoard = async () => {
 await axios.patch(`http://localhost:8080/api/v1/boards`).then((res) => {
 alert('수정되었습니다.');
 navigate('/boards/');
 });
 };
 const isLogin = !!localStorage.getItem("accessToken");


 const backToDetail = () => {
 navigate('/boards/');
 };


 return (
 <div>
 <div>
 <span>제목</span>
 <input type="text" name="title" value={title} onChange={onChange} />
 </div>
 <br />

 <br />
 <div>
 <span>내용</span>
 <textarea
 name="contents"
 cols="30"
 rows="10"
 value={contents}
 onChange={onChange}
 ></textarea>
 </div>
 <br />
 <div>
 <button onClick={updateBoard}>수정</button>
 <button onClick={backToDetail}>취소</button>
 </div>
 </div>
 );
 };

 export default BoardUpdate; */