export default {
    get: jest.fn().mockResolvedValue(
        {data:{
            results:[
                {
                    question: "Which%20best%20selling%20toy%20of%201983%20caused%20hysteria%2C%20resulting%20in%20riots%20breaking%20out%20in%20stores%3F",
                    correct_answer: "Cabbage%20Patch%20Kids",
                    incorrect_answers:["Transformers", "Care%20Bears", "Rubik%E2%80%99s%20Cube"]
                },
                {
                    question: "Area%2051%20is%20located%20in%20which%20US%20state%3F",
                    correct_answer: "Nevada",
                    incorrect_answers:["Arizona", "New%20Mexico", "Utah"]
                }]
            }
        }
    )
};