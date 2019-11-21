package com.tony;

/**
 * @author jiangwenjie 2019/11/11
 */
public class JdkVersionTest {

    public String hello(String name) {
        return "Hello! " + name;
    }

    public String getJdkVersion() {
        return "Hello2!" + System.getenv("java.version");
    }

}
