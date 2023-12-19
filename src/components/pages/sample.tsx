// import axios from 'axios';

// import React, { useState } from 'react';


// const ImageGenerator: React.FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [images, setImages] = useState<string[]>([]);
//   const [selectedKeyword_1, setSelectedKeyword_1] = useState<string | null>(null);
//   const [selectedKeyword_2, setSelectedKeyword_2] = useState<string | null>(null);
//   const [selectedKeyword_3, setSelectedKeyword_3] = useState<string | null>(null);

//   // 新しいstateを追加: ラジオボタンとキーワードの対応
//   const genderbutton = [
//     { label: '男性', value: 'male' },
//     { label: '女性', value: 'female' },
//     { label: '秘密', value: 'neutral' }
//     // 他にもラジオボタンとキーワードの対応を追加
//   ];

//   const heightbutton = [
//     { label: '141~150', value: 'Height: 141 cm to 150 cm' },
//     { label: '151~160', value: 'Height: 151 cm to 160 cm' },
//     { label: '161~170', value: 'Height: 161 cm to 170 cm' },
//     { label: '171~180', value: 'Height: 171 cm to 180 cm' },
//     { label: '181~190', value: 'Height: 181 cm to 190 cm' },
//     // 他にもラジオボタンとキーワードの対応を追加
//   ];

//   const weightbutton = [
//     { label: '41~50', value: 'Weight: 41 kg to 150 kg' },
//     { label: '51~60', value: 'Weight: 51 kg to 150 kg' },
//     { label: '61~70', value: 'Weight: 41 kg to 150 kg' },
//     { label: '71~80', value: 'Weight: 41 kg to 150 kg' },
//     { label: '81~90', value: 'Weight: 41 kg to 150 kg' },
//     // 他にもラジオボタンとキーワードの対応を追加
//   ];

//   const generateImage = async () => {
//     if (!selectedKeyword_1) {
//       return; // 選択されたキーワードがない場合は何もしない
//     }
//     if (!selectedKeyword_2) {
//       return; // 選択されたキーワードがない場合は何もしない
//     }
//     if (!selectedKeyword_3) {
//       return; // 選択されたキーワードがない場合は何もしない
//     }

//     setLoading(true);
//     try {
//       const headers = {
//         'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
//         'Content-Type': 'application/json'
//       };

//       const requestBody = {
//         model: "dall-e-3",
//         prompt: "Japanese" +"of"+"gender"+ selectedKeyword_1 + selectedKeyword_2,  // 選択されたキーワードを使って画像を生成
//         n: 1,
//         response_format: "url",
//       };

//       const response = await axios.post('https://api.openai.com/v1/images/generations', requestBody, { headers: headers });
//       setImages(response.data.data.map((imgData: any) => imgData.url));
//     } catch (error) {
//       console.error("Error generating image:", error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       {loading && <div>Loading...</div>}

//       {/* ラジオボタンをマップしてレンダリング */}

//       <div>性別
//       </div>
//       {genderbutton.map((item_1, index) => (
//         <label key={index}>
//           <input
//             type="radio"
//             value={item_1.value}
//             checked={selectedKeyword_1 === item_1.value}
//             onChange={() => setSelectedKeyword_1(item_1.value)}
//           />
//           {item_1.label}
//         </label>
//       ))}

//       <div>身長
//       </div>
//       {heightbutton.map((item_2, index) => (
//         <label key={index}>
//           <input
//             type="radio"
//             value={item_2.value}
//             checked={selectedKeyword_2 === item_2.value}
//             onChange={() => setSelectedKeyword_2(item_2.value)}
//           />
//           {item_2.label}
//         </label>
//       ))}
      
//       <div>体重
//       </div>
//       {weightbutton.map((item_3, index) => (
//         <label key={index}>
//           <input
//             type="radio"
//             value={item_3.value}
//             checked={selectedKeyword_3 === item_3.value}
//             onChange={() => setSelectedKeyword_3(item_3.value)}
//           />
//           {item_3.label}
//         </label>
//       ))}
// <br />
//       <button onClick={generateImage}>Generate Image</button>

//       {images.map((url, index) => (
//         <img key={index} src={url} alt={`Generated ${selectedKeyword_1}`} />
//       ))}
//     </div>
//   );
// }

// export default ImageGenerator;
