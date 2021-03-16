---
title: Rust-learning
date: 2021-03-13 22:54:14
tags:
---

<!-- more -->

- 安装编写第一批 Rust 代码所需的工具
- 了解 Rust 中的基本概念
- 了解如何处理错误
- 在 Rust 中管理内存
- 使用泛型类型和特征
- 为包和箱设置模块
- 编写并运行自动测试
- 创建命令行程序


# 如何安装 Rust

可以直接参考以下网站：[Rust](https://www.rust-lang.org/zh-CN/tools/install)

需要 VS 2019 或者其他 VS 2013 的编译环境。 如果没有的话可以直接安装。

[Download Visual C++ Build Tools](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)





# 了解 Rust 中常见的概念

了解 Rust 的基础知识。 浏览变量、数据类型、结构、枚举、函数、索引、哈希映射和流控制。


- 使用 let 语句将值分配给变量。
- 了解如何注释代码，以使其更具描述性。
- 发现 Rust 标准库中存在的基本数据类型。
- 编写自己的函数。
- 使用集合将多个值存储在一个结构中。
- 了解如何在代码中使用条件语句和循环。

## 创建和使用变量

可以使用 `let` 关键字将值绑定到变量。

```rust

fn main() {
  let a_number = 10;
  let a_boolean = true;

  println!("the number is {}.", a_number);
  println!("the boolean is {}.", a_boolean);
}

```

`println` 宏将字符串用作第一个参数，并为该字符串中的每个 `{}` 使用一个额外参数，然后将其替换以便显示参数值。

### 可变性

在 Rust 中，变量绑定默认不可变。 如果变量不可变，在将值绑定到名称后，将无法更改此值。
例如，如果我们尝试更改上一示例中的数字值，则将收到编译器发出的错误消息。

```
fn main() {
  let a_number = 10; // error: cannot assign twice to immutable variable `a_number`
  println!("the number is {}.", a_number);
  a_number = 15;
  println!("and now the number is {}.", a_number);
}
```

用户可在 [Rust Playground](https://play.rust-lang.org/) 中看到此错误消息。 选择 `“运行”` 按钮运行代码。

若要更改值，必须先使用 `mut` 关键字将变量绑定设为可变。

### 阴影操作

用户还可使用与上一个变量相同的名称声明新变量，这会创建一个新绑定。 在 Rust 中，此操作称为“隐藏”，这是由于新变量会隐藏上一个变量。 旧变量仍存在，但无法再于此范围内引用它。

在前面的示例中，变量 number 无需设为可变。 因为每个操作都会创建新变量并隐藏上一个变量，因此不会发生任何变化。

```rust
fn main() {
    let number = 5;          // the first binding is created using the name "number"
    let number = number + 5; // a different binding shadows the name "number"
    let number = number * 2; // again, a new binding is created
    println!("The number is: {}", number);
}

```

能猜出输出结果吗？ 请访问 [Rust Playground 以运行此示例](https://play.rust-lang.org/) 。


## 了解数据类型

Rust 是一种静态类型语言，这表示编译器必须准确获知代码中每个变量的数据类型。

大多数情况下，编译器都可推断出某个值的类型，无需用户在代码中显式指出。 有时会存在多种数据类型，此时用户便须告知编译器必须要使用何种数据类型。 在这些情况下，可以使用“类型注释”。

例如，假设我们要编写一个程序，让该程序将字符串转换为数字，并使用 `.parse()` 方法执行此操作。

``` rust
fn main(){
    let number: u32 = "42".parse().expect("Not a number!");
}
```

在此示例中，我们通过直接在变量名称后面批注类型“(u32)”，告诉编译器将 `number` 变量设为 32 位数字。

我们可以尝试删除该类型注释，以引发并观察编译器错误：

``` rust
fn main(){
    let number = "42".parse().expect("Not a number!");
}
```

错误：

```
Execution
Close
Standard Error
   Compiling playground v0.0.1 (/playground)
error[E0282]: type annotations needed
 --> src/main.rs:2:9
  |
2 |     let number= "42".parse().expect("Not a number!");
  |         ^^^^^^ consider giving `number` a type
```

### Rust 内置数据类型

Rust 附带一些用于表达数字、文本和真值性的内置数据类型。 我们将在后续子主题中逐一介绍。

#### 数字

| 长度    | 有符号   | 无符号   |
|-------|-------|-------|
| 8 位   | i8    | u8    |
| 16 位  | i16   | u16   |
| 32 位  | i32   | u32   |
| 64 位  | i64   | u64   |
| 128 位 | i128  | u128  |
| 拱门    | isize | usize |

此外，`isize` 和 `usize` 类型取决于运行程序的计算机类型：如果使用 64 位体系结构，则为 64 位；如果使用 32 位体系结构，则为 32 位。 只要未有指定，上述两者即为分配给整数的默认类型。

Rust 的浮点类型为 `f32` 和 `f64` ，大小分别对应 32 和 64 位。

默认类型为 `f64` ，因为在新式 `CPU` 上，其速度大致与 `f32` 相同，但精度更高。

```rust
fn main() {
    // Addition
    println!("1 + 2 = {}", 1u32 + 2);

    // Subtraction
    println!("1 - 2 = {}", 1i32 - 2);
    // ^ Try changing `1i32` to `1u32` to see why the type is important

    // Integer Division
    println!("9 / 2 = {}", 9u32 / 2);

    // Float Division
    println!("9 / 2 = {}", 9.0 / 2.0);

    // Multiplication
    println!("3 * 6 = {}", 3 * 6)
}
```

执行结果如下：

```
1 + 2 = 3
1 - 2 = -1
9 / 2 = 4
9 / 2 = 4.5
3 * 6 = 18
```


#### 布尔型

Rust 中的布尔值由类型 `bool` 表示，并具有两个可能的值：`true` 或 `false`。 这些布尔值广泛用于条件句中（如 `if` 和 `else` 表达式）， 均为比较检查的结果。

```
let is_bigger = 1 > 4;
println!("{}", is_bigger);  // prints "false"
```

#### 字符和字符串

Rust 包含两类字符串和一个字符类型。 这些类型均为有效的 `UTF-8` 表示形式。

`char` 类型是最基本的基元类型，并由单引号指定：

```rust
let c = 'z';
let z = 'ℤ';
let heart_eyed_cat = '😻';
```

`str` 类型也称为“字符串字面量”，它是最基本的字符串类型，其中字符串的值会硬编码为程序文本。 
大多数情况下，我们使用 `&str` 形式来引用这些类型。 
关于引用，我们将在后续模块中介绍。 

现在，大家可将 `&str` 视为指向不可变字符串字面量的指针。

尽管在 Rust 入门示例中使用字符串字面量很方便，但它们并不适合可能要使用文本的每种情况。 这是因为，在编译时并非每个字符串都是已知的， 例如当用户与程序进行交互并通过终端发送文本时。

在这些情况下，Rust 提供第二种字符串类型 `String`。 此类型在堆上分配。 它可以存储编译时未知的文本量。 用户可以使用 `from` 函数并通过字符串字面量创建 `String`，如下所示：


```rust
fn main() {
    let mut hello = String::from("Hello, ");  // create a String from a string literal
    hello.push('w');                          // push a character into our String
    hello.push_str("orld!");                  // push a string literal into our String
    println!("{}", hello)
}

```

执行结果：

```
Hello, world!
```

#### 元组

元组是集中到一个复合体中的不同类型值的分组。 元组具有固定长度，这表示在声明后，它们便无法增大或缩小。 元组的类型由各元素类型的序列定义。

下面是长度为 3 的元组：

```rust

("hello", 5_i32, 'c');

```

此元组具有类型签名 `(&'static str, {integer}, char)`，其中：

    - `&'static str` 是第一个元素的类型。
    - `i32` 是第二个元素的类型。
    - `char` 是第三个元素的类型。

用户可以按位置访问元组元素，这称为“元组索引”。 如下所示：


```rust
fn main() {
  let tuple = ("hello", 5, 'c');

  assert_eq!(tuple.0, "hello");
  assert_eq!(tuple.1, 5);
  assert_eq!(tuple.2, 'c');
}
```

`assert_eq!` 宏用于验证两个表达式是否相等。

如要将不同类型组合成单个值，元组便可派上用场。 例如，考虑到元组可以容纳任意数量的值，我们可以在函数中使用元组返回多个值。



## 了解结构和枚举

结构是多个其他类型的组合体。 与元组一样，结构的各个部分可以是不同的类型，但我们可以为每个数据片段命名，以便清楚说明值的含义。

Rust 具有三类结构，分别为： 经典结构、元组结构和单元结构。

```rust
// A struct with named fields
struct Person {
    name: String,
    age: u8,
    likes_oranges: bool
}

// A tuple struct
struct Point2D(u32, u32);

// A unit struct
struct Unit;
```


- [“经典 C 结构”](https://en.wikipedia.org/wiki/Struct_(C_programming_language)) 最为常用。 其中定义的每个字段都具有名称和类型。 定义后，我们可以使用 `example_struct.field` 语法来访问它们。
- “元组结构”类似于经典结构，但其字段没有名称。 如要访问单个变量，请使用与常规元组相同的语法，即 `foo.0` 、`foo.1` 等（从零开始）。
- “单元结构”最常用作标记。 当需要对某些内容实现特征，但又无需在其中存储任何数据时，这种结构便可派上用场。


### 结构实例化

如要在作出定义后使用某个结构，请为每个字段指定具体值来创建该结构的实例。


```rust
fn main() {
    let person = Person{
        name: String::from("Adam"),
        likes_oranges: true,
        age:25
    };
    let origin = Point2D(0,0);
    
    let unit = Unit;
}
```

### 枚举

枚举可为任意一种变体类型。

如果用户具有函数编程背景，便会知道 Rust 中提及的枚举通常称为 [代数数据类型](https://en.wikipedia.org/wiki/Struct_(C_programming_language))。 一个重要的细节是，每个枚举变体都能有对应的数据。

`enum` 关键字允许创建类型，此类型可能是几个不同的变体之一。 对于任一有效的结构变体，当该变体作为枚举时，同样有效。

在下面的示例中，我们定义了一个枚举来对 Web 事件进行分类。 每个变体都是独立的，可存储不同数量和类型的值。

```rust

enum WebEvent {
    // An enum may either be unit-like,
    PageLoad,
    PageUnload,
    // An enum can include characters and strings
    KeyPress(char),
    Paste(String),
    // or include tuple structs
    Click { x: i64, y: i64 },
}

```

此枚举具有四个不同类型的变体：

- `PageLoad` 和 `PageUnload` 没有任何关联的数据。
- `Keypress` 包含单个字符。
- `Paste` 包含单个字符串。
- `Click` 包含一个匿名结构。
使用变体（如前一个变体）定义枚举与对不同种类的结构进行定义十分相似。 不同之处是，枚举不使用 `struct` 关键字。 此外，所有变体都归于同一 `WebEvent` 类型下。

如果选择为每个变体定义单独的结构，则可以保存前面的枚举变体所持有的相同数据， 但这种定义意味着每个结构都具有专属类型。 我们无法像 `WebEvent` 枚举那样轻松定义函数，使其采用这些 Web 事件种类中的任何一种，因为前者是单一类型。



## 使用函数创建可重用功能


函数是在 Rust 中执行代码的主要方法。 我们已有提及此语言中最重要的一种函数。 `main` 函数是许多程序的入口点。

Rust 中的函数定义从 `fn` 开始，且在函数名称之后包含一组圆括号。 编译器通过大括号判断函数体的起始和结束位置。

```rust
fn main() {
    println!("Hello, world!");
    another_function();
}

fn another_function() {
    println!("Hello from another function!");
}

```
用户可以输入名称并紧接添加一组圆括号来调用函数，还可视需要传递任何参数。 在前述示例中，`another_function` 无需任何参数，因此我们并未传递任何参数。

在源代码中，我们已在 main 函数之后定义 `another_function`。 我们也可在该函数之前对其进行定义。 Rust 不注重函数的定义位置，而只注重用户是否已在某处定义函数。

下面，我们尝试声明一个函数，使其接受参数并返回值。

### 向函数传递参数

在下方示例中，我们将声明一个函数，使其检查给定的数字是否可被另一个值整除并返回 `boolean` 值进行确认。

```rust
fn is_divisible_by(dividend: u32, divisor: u32) -> bool {
    // If the divisor is zero, we want to return early with a `false` value
    if divisor == 0 {
    return false;
    }
    dividend % divisor == 0
}
```

下面，我们来看看以下函数签名：

- `fn`：Rust 中的函数声明关键字。

- `is_divisible_by`：函数名称。

- `(dividend: u32, divisor: u32)`：此函数的参数列表。 其声明应输入两个无符号 32 位整数值。

- `-> bool`：箭头指向此函数将始终返回的值类型。

`is_divisible_by` 函数接受两个整数作为输入值，并输出一个布尔值。

现在，让我们更深入地了解以下函数体：


```rust

if divisor == 0 {
    return false;
}

```

函数这一部分的全部目的在于防止出现典型的编程错误，即被零除。

我们仍未讲到“条件表达式”，但此代码片段十分简单。 `if` 关键字用于检查 `divisor` 变量所包含的值是否为零。 若为是，则执行以下块中的代码。 若为否，该函数将使用关键字 `return` 并紧接要返回的值，借此返回布尔值 `false`。

此函数体中的最后一行是不含 `return` 关键字的表达式：

```rust
dividend % divisor == 0

```


在 Rust 中，函数会始终返回代码块中的最后一个表达式 `({ ... })`，因此我们无需在此处使用 `return` 关键字。

此表达式使用余数运算符 (`%`) 求得两项相除后的余数，并与零进行比较。 应用等号运算符 (`==`) 得出的类型为 `bool` 类型，其可为如下值：`true` 或 `false`。

### 调用函数

下面，我们来看看函数的实际应用。

```rust
fn is_divisible_by(dividend: u32, divisor: u32) -> bool {
    if divisor == 0 {
    return false;
    }
    dividend % divisor == 0
}

fn main() {
    assert_eq!(is_divisible_by(2, 3), false);
    assert_eq!(is_divisible_by(5, 1), true);
    assert_eq!(is_divisible_by(24, 6), true);
}
```


建议在此 Rust Playground 链接中与前述示例进行交互。

看起来一切正常。 但若更改函数的返回类型，会发生什么情况呢？

我们可以尝试故意犯错，以便深入了解 Rust 的工作原理。 下面，我们尝试打破函数协定，并声明其应返回 `char` 而非 `bool` 类型，同时不修改函数的主体。

```rust
fn is_divisible_by(dividend: u32, divisor: u32) -> char {
//                                                 ^^^^
```

我们会收到一些编译器错误，其中说明函数定义中包含“不匹配的类型”。

```
error[E0308]: mismatched types
     --> src/main.rs:3:16
      |
    1 | fn is_divisible_by(dividend: u32, divisor: u32) -> char {
      |                                                    ---- expected `char` because of return type
    2 |     if divisor == 0 {
    3 |         return false;
      |                ^^^^^ expected `char`, found `bool`

    error[E0308]: mismatched types
     --> src/main.rs:5:5
      |
    1 | fn is_divisible_by(dividend: u32, divisor: u32) -> char {
      |                                                    ---- expected `char` because of return type
    ...
    5 |     dividend % divisor == 0
      |     ^^^^^^^^^^^^^^^^^^^^^^^ expected `char`, found `bool`
```

此错误表明预期类型 (`char`) 与接收的类型 (`bool`) 不匹配。

函数中的两个返回点都从编译器收到了投诉，其中说明本应返回 `char`，但实际却找到了 `bool`。


## 使用集合类型

除元组以外，Rust 还具有许多其他“复合类型”，这些“复合类型”可将多个值归入单一类型。

### 数组

数组是同类对象的集合，这些对象按顺序存储在内存中。 使用方括号 `[]` 可创建数组。 数组大小在编译时已知，且为其类型签名 `[T; size]` 的组成部分；其中 `T` 是数组所含值的类型，`size` 是在编译时检查的非负整数。

换言之，数组的长度固定不变。 数组的每个元素必须属于同一类型。

可以通过以下两种方式定义数组：

- 使用逗号分隔列表，并用方括号括起
- 使用初始值，后跟一个分号，然后添加数组长度（用方括号括起）


### 向量

与数组一样，用户可以使用向量存储同一类型的多个值。 但不同点在于，向量可以随时增大或缩小。 此功能隐含在向量大小中，在编译时未知，因此 Rust 无法阻止用户访问向量中的无效位置。

用户可以使用 `vec!` 宏初始化向量。


### 哈希映射

常见集合中的最后一种类型是哈希映射。 类型 `HashMap<K, V>` 存储 `K` 类型键到 `V` 类型值的映射。 其中，向量按整数索引存储值，哈希映射则依键存储值。

许多编程语言都支持这类数据结构。 它们通常使用不同的名称，例如哈希、映射、对象、哈希表、字典或关联数组。

与向量一样，哈希映射可以扩充，将数据存储在堆中，而且系统可在运行时检查有关其所含项的访问权限。




# 在 Rust 中处理错误

## 使用 panic! 处理无法恢复的错误

## 使用 Option 类型来处理缺失

如果值是可选的或缺少值不是一种错误情况，请使用 Option 枚举。

### 模式匹配




## 当可能出现问题并且调用方必须处理问题时，请使用 Result 枚举


