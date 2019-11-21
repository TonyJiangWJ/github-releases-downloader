package com.tony;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * @author jiangwenjie 2019/11/11
 */
public class PureHttpTest {
    public static void main(String[] args) throws IOException {
        HttpURLConnection connection = (HttpURLConnection)new URL("https://api.github.com/repos/TonyJiangWJ/Ant-Forest-autoscript/releases/latest").openConnection();
        //设置连接时间，10秒
        connection.setConnectTimeout(10 * 1000);
        connection.setReadTimeout(10 * 1000);

        //数据编码格式，这里utf-8
        connection.setRequestProperty("Charset", "utf-8");

        //设置返回结果的类型，这里是json
        connection.setRequestProperty("accept", "application/json");

        //这里设置post传递的内容类型，这里json
        connection.setRequestProperty("Content-Type", "application/json");

        System.setProperty("https.protocols", "TLSv1");

        System.out.println(getStreamContent(connection));

    }

    private static String getStreamContent(HttpURLConnection urlConnection) {
        ByteArrayOutputStream byteArrayOutputStream = null;
        BufferedInputStream bufferedInputStream = null;
        String result = null;

        try {
            //开启客户端与Url所指向的资源的网络连接
            urlConnection.connect();
            System.out.println("请求结果：" + urlConnection.getResponseCode());
            if (200 == urlConnection.getResponseCode()) {//HTTP_OK 即200，连接成功的状态码
//                if (urlConnection.getContentLength() > 0) {
                    bufferedInputStream = new
                            BufferedInputStream(urlConnection.getInputStream());
                    byteArrayOutputStream = new ByteArrayOutputStream();
                    //httpUrlConnection返回传输字节的长度，创建一个byte 数组。
                    byte[] b = new byte[1024];
                    int length;
                    while ((length = bufferedInputStream.read(b)) > 0) {
                        byteArrayOutputStream.write(b, 0, length);
                    }
                    result = byteArrayOutputStream.toString("utf-8");
//                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (byteArrayOutputStream != null) {
                    byteArrayOutputStream.close();
                }
                if(bufferedInputStream!=null){
                    bufferedInputStream.close();
                }
                if (urlConnection != null) {
                    //解除连接，释放网络资源
                    urlConnection.disconnect();
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

        }
        return result;
    }
}
