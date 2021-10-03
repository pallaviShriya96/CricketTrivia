import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupName } from '@angular/forms';
import * as data from '../../data.json';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.css'],
})
export class QuestionAnswerComponent implements OnInit {
  form: FormGroup;
  correctAnswers = 0;
  inCorrectAnswers = 0;
  incorrectAnswersIndex =[];
  questions: any = (data as any).default;
  graphData = [];
  view: any[] = [700, 400]; // Data to maintain the view of the graph

  // Data to set up the graph
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Number';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showGraph = false;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private formBuilder: FormBuilder) {
    // Mapped the question ids to a formcontrol
    this.form = this.formBuilder.group(
      this.questions.reduce((obj, question) => {
        obj[question.id] = [""];
        return obj
      }, {})
    )
    // Object.assign(this, { single });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.incorrectAnswersIndex = [];
    this.correctAnswers = 0; //Re-intialising the correct answers count to 0
    this.inCorrectAnswers = 0; //Re-intialising the Incorrect answers count to 0
    // Fetching the values of the Ids of the questions from the form
    const keys = Object.keys(this.form.getRawValue());
    // Mapping the keys to the respective aswers.
    keys.forEach((key, index) => {
      // Checks for the Incorrect answers
      if(this.questions[index].correctOption == `${this.form.getRawValue()[key]}`){
        this.correctAnswers ++; // Counts the number of correct answers
      } else {
        this.inCorrectAnswers ++; // Counts the number of incorrect answers
        this.incorrectAnswersIndex.push(index); // Stores the index for each incorrect answer in an array
      }
      console.log(this.incorrectAnswersIndex);
    });
    this.graphData = [
      {
        name: "Correct",
        value: `${this.correctAnswers}`
      },
      {
        name: "Incorrect",
        value: `${this.inCorrectAnswers}`
      }
    ];
    this.showGraph =true;
  }

  // To Clear the values given by the user and reset the form
  clearValues(){
    this.form.reset();
    this.showGraph = false;
    this.incorrectAnswersIndex = [];
  }
}
