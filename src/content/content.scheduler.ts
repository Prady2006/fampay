import{Cron, CronExpression} from "@nestjs/schedule"
import { InjectQueue } from "@nestjs/bull";
import  {Queue} from "bull"

export class ContentSchedulerService {
    private readonly url = `${process.env.YOUTUBE_API}?part=snippet&q=${process.env.QUERY}&order=${process.env.ORDER}&publishedAfter=${process.env.PUBLISHED_AFTER}`
    
    constructor(
        @InjectQueue("content") private fetchQueue : Queue
        ){

    }

    @Cron(CronExpression.EVERY_10_MINUTES)
    async fetchContent(){
        this.fetchQueue.add({url: this.url})
    }
}