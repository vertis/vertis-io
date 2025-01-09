---
layout: post
title: 'Native Java with GCJ and SWT'
author: vertis
published: true
date: '2007-06-24'
---

The ability to compile Java to native code has existed for a while in the form of GCJ, though for the most part it has been overlooked due in part to the incomplete Swing/AWT implementation. Knowledge about how to use GCJ for native compilation is a bit vague. When you first start using GCJ as a real alternative to the Sun JDK it's difficult to get an idea of exactly what GCJ is capable of doing.

<!--more-->

## Getting GCJ

If you are a linux user most distributions come with GCJ as either preinstall or one that you can easily install with your favorite package manager. If you are using Windows then your best bet is to use the packages found at [http://www.thisiscool.com/gcc_mingw.htm](http://www.thisiscool.com/gcc_mingw.htm)

Mohan Embar, the author of the ThisIsCool website has created several builds of the MingW GCJ that can be easily installed. Additionally he has built in SWT and SwingWT support to some of the builds. Keep in mind that shared builds, and the creation of 'dll' files is not supported under the 4.x series of GCJ found on this page.

For the remainder of this build we will be using the latest GCJ found on this page, which includes the eclipse merge branch from the GCC SVN, the best thing about this is that it gives support for Java 5 features.

## Basic Native Compilation

The first step is to create a basic 'Hello World!' application, to demonstrate compiling an application.

```java
public class HelloWorld {

    /**
    * @param args
    */
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        System.out.println("Hello World!");
    }

}
```

Assuming you've added the gcc-ecj\bin\ folder to your path, you can then compile the application using the following command:

```bash
gcj -o Hello.exe -main=HelloWorld HelloWorld.java
```

You can then run the resulting EXE just as you would any other application.

## Basic Windows Application

If you tried running this application from windows (and not from the command line) you wouldn't have seen much, just a black window flashing up and then closing again. Let's do a basic Windows application so that you can begin making your masterpiece. This is accomplished using SWT. We will start by creating a 'HelloWindows.java' file:

```java
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Shell;

public class HelloWorld {
  public static void main(String[] args) {
    Display display = new Display();
    Shell shell = new Shell(display);

    shell.setText("Hello, world!");

    shell.open();
    // Set up the event loop.
    while (!shell.isDisposed()) {
      if (!display.readAndDispatch()) {
        // If no more entries in the event queue
        display.sleep();
      }
    }
    display.dispose();
  }
}
```

We will then compile the source in two steps.

```bash
gcj --classpath .; lib\swt.jar -c -o HelloWindow.o
```

This creates a object file that can be used in the next step to create a working java application.

```bash
gcj --main=HelloWindows -mwindows -o HelloWindows.exe HelloWindow.o lib\swt.a
```

You will still need the DLL files that came packaged with thisiscool gcj in order to run the application but it should create a small windows with 'Hello Windows' in the title bar; not very exciting I will admit, but it demonstrates a working windows application.

Notes about this step:

The 'swt.jar', 'swt.a' and 'swt\*.dll' files can be found as a part of the thisiscool download, you either need to move them into the same directory as your project or provide a full directory in the adequate place. The dll files should be placed in the same directory as the build .exe file.

## More Complex Projects and Libraries

One of the things you may not know is that GCJ can not only work from source files, but also from class and jar files. This is particularly useful if you want to do more complex projects that use existing libraries such as the db4o-6.0-java5.jar file gotten from [http://www.db4o.com/](http://www.db4o.com/).

First create the object file, using the command:

```bash
gcj -c db4o-6.1-java5.jar
```

This creates a file, db4o-6.0-java5.o; we then use 'ar' tool to create a static library:

```bash
ar -r libdb4o.a db4o-6.1-java5.o
```

This library file can then be combined into our future projects much the same way as jar files are used in current java projects.

## Using Our Shared Library

Not to put the work to waste lets compile a project using the DB4o library that we created in the last part. The source code is too long to paste into the body of the article so I've included it in a zip folder so that you can try it later. Let's start by compiling the source to object files as before:

```bash
gcj -classpath .;lib\db4o-6.1-java5.jar;lib/swt.jar -c HelloDb4o.java Account.java
```

Then we take the library we created before and combine it with the main project (also adding the SWT library):

```bash
gcj -o hellodb4o.exe -mwindows --main=HelloDb4o HelloDb4o.o Account.o lib\libdb4o.a lib\libswt.a
```

You now have an application that will display the record from the database.

## Final Notes

Size is often one of the pet complaints when people compile using GCJ, I would encourage people to check out UPX ([http://upx.sourceforge.net/](http://upx.sourceforge.net/)).

The source listings here in were done quite hurriedly; particularly the last application would need a good deal of work before it was functional in a useful way. DB4o is a topic for several books, I strongly encourage you to take it out for a test drive.

In order to catch bugs it is in the interest of the developer to remove the '-mwindows' option from the final build. This causes a command line window to be created behind the main screen to which printed exceptions are sent. Alternately and perhaps more correctly logging to file could be implemented.

Finally, it is possible to use Ant and other build tools to make building projects easier, you will find details in the resources on how to accomplish this. For the purposes of explanation I have chosen NOT to use these tools in this article.

## Resources

The following were useful guides/tools as I was getting started with GCJ Native Development.

Create native, cross-platform GUI applications - [http://www.ibm.com/developerworks/library/j-nativegui/](http://www.ibm.com/developerworks/library/j-nativegui/)

Create native, cross-platform GUI applications, revisited - [http://www.ibm.com/developerworks/java/library/j-nativegui2/](http://www.ibm.com/developerworks/java/library/j-nativegui2/)

How to compile Java application to native code, for example to Windows EXE file - [http://robohobby.s41.eatj.com/java_to_native_code_exe.jsp](http://robohobby.s41.eatj.com/java_to_native_code_exe.jsp)

DB4o Object Oriented Database - [http://www.db4o.com/](http://www.db4o.com/)

The Ultimate Packer for Executables - [http://upx.sourceforge.net/](http://upx.sourceforge.net/)

ThisIsCool GCJ - [http://www.thisiscool.com/gcc_mingw.htm](http://www.thisiscool.com/gcc_mingw.htm)
