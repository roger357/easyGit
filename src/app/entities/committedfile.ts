import { FileDiff } from './filediff'


export class CommittedFile{
	modificationType: string;
	filePath: string;
	fileDiffs: FileDiff[];
}