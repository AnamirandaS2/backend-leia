// import fs from 'fs';

import supabase from '../../database/bucket';
import parseFilename from '../../utils/parseFilename';

export default async function getBookService(title: string, author: string) {
  const { data: { publicUrl: name }} = await supabase.storage.from('books').getPublicUrl(`${parseFilename('', title, author)}`);

  // const arrayBuffer = await data!.arrayBuffer();
  // const name = `${parseFilename('', title, author)}.pdf`;
  // const buffer = Buffer.from(arrayBuffer);
  // const stream = fs.createWriteStream(name);
  // stream.write(buffer, ()=> {
  //   stream.end();
  // });
  
  // return new Promise(resolve => {
  //   stream.on('finish', ()=> {
  //     stream.end();
  //     fs.rm(name, ()=>{});
  //     const pdf = fs.readFileSync(name, 'utf8');
  //     resolve(pdf);
  //   });
  // });
  return name;
}
