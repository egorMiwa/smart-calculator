class SmartCalculator {
  constructor(initialValue) {
    this.array = [initialValue];
    this.outexp = [];
    this.value = 0;
    this.myset = new Set();
  }

  add(number) {
    this.array.push('+');
    this.array.push(number);
    return this;
  }

  subtract(number) {
    this.array.push('-');
    this.array.push(number);
    return this;
  }

  multiply(number) {
    this.array.push('*');
    this.array.push(number);
    return this;
  }

  devide(number) {
    this.array.push('/');
    this.array.push(number);
    return this;
  }

  pow(number) {
    this.array.push('^');
    this.array.push(number);
    return this;
  }
  

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  important(a) {
    switch (a) {
      case '^': return 4;
      case '*': case '/': return 3;
      case '-': case '+': return 2;
      case '(': return 1;
    }
    return 0;
  }
  
  toPostfix(){
    this.myset.add('^');
    this.myset.add('*');
    this.myset.add('/');
    this.myset.add('+');
    this.myset.add('-');
    var stack = [], ss, a;

    for (var k = 0; k < this.array.length; k++) {
      ss = this.array[k];
      if (ss == '(') stack.push(ss);
      if (ss == ')') {
        for (var z = 0; stack[i] != '('; z++) {
          this.outexp.push(stack.pop());
        }
        stack.pop();
      }

      if (this.isNumeric(ss)) this.outexp.push(ss);
      if (this.myset.has(ss)) {
        if (stack.length > 0 && (stack[stack.length - 1] == '^' && ss == '^')) {
          stack.push(ss);
        } else {
          while (stack.length > 0 && this.important(stack[stack.length - 1]) >= this.important(ss)) {
            this.outexp.push(stack.pop());
          }
          stack.push(ss);
        }
      }
    }
    while (stack.length > 0) {
      this.outexp.push(stack.pop());
    }
  }

  toSolve() {
    var resultStack = [];
  
    for (var i = 0; i < this.outexp.length; i++) {
      if (this.isNumeric(this.outexp[i])) {
        resultStack.push(this.outexp[i]);
      } 
      else {
        var a = resultStack.pop();
        var b = resultStack.pop();
     
        if (this.outexp[i] === "+") {
          resultStack.push(parseInt(a) + parseInt(b));
        } 
        else if (this.outexp[i] === "-") {
          resultStack.push(parseInt(b) - parseInt(a));
        } 
        else if (this.outexp[i] === "*") {
          resultStack.push(parseInt(a) * parseInt(b));
        } 
        else if (this.outexp[i] === "/") {
          resultStack.push(parseInt(b) / parseInt(a));
        } 
        else if (this.outexp[i] === "^") {
          resultStack.push(Math.pow(parseInt(b), parseInt(a)));
        }
      }
    }

    if (resultStack.length > 1) {
      return "error";
    } 
    else {
      this.value = resultStack.pop();
      console.log(this.value);
      return this.value;
    }
  }

  toString() {
    this.toPostfix();
    return this.toSolve();
  }

}

module.exports = SmartCalculator;