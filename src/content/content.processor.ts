import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull"
import { ContentService } from "./content.service";
import { HttpService } from "@nestjs/axios";

@Processor("content")
export class ContentProcessor {

  private  validKeyIdx  = 0
  private api_keys = JSON.parse(process.env.API_KEY)
  constructor(
    private  contentService : ContentService,
    private httpService : HttpService
    ){

  }

  @Process()
  async fetchDataAndUploadToDB(job: any ){
    
    let url = job.data.url 
    url += `&key=${this.api_keys[this.validKeyIdx]}`
    let result = await this.makeApiCall(url)
    if(!result["status"]) {
      let any_valid_keys = await this.determineValidAuthKey((this.validKeyIdx+1)%this.api_keys.length, job.data.url)
      if(any_valid_keys === -1) {
        console.log("No Valid Keys Found");
        return ;
      }
      this.validKeyIdx = any_valid_keys

      result = await this.makeApiCall(job.data.url + `&key=${this.api_keys[this.validKeyIdx]}`)
      // updating validKeyIdx 
    }
    for(let x of result["result"]["data"]["items"]){
      console.log(x)  
      await this.contentService.add(x)
    }
  }
  
  async determineValidAuthKey(idx: number, url: string): Promise<number> {
    let count = 0 ;
    while(count < this.api_keys.length){ 
      url += `&key=${this.api_keys[idx]}`
      const result = await this.makeApiCall(url)
      if(result["status"]) {
        return idx;
      }
      count++;
    }
    return -1;
  }

  makeApiCall(url){
    return new Promise(async (resolve, reject)=>{
      try{
        const result = await this.httpService.axiosRef.get(url)
        resolve({status:true, result: result})
      }catch(e){
        resolve({status:false})
      }
    })
  }
}


  
