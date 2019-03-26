package com.reactnativecomponent.barcode.decoding;


import android.content.Context;
import android.graphics.Bitmap;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;

import java.util.Hashtable;
import java.util.Vector;


public class BitmapDecoder {
    MultiFormatReader multiFormatReader = new MultiFormatReader();

    public BitmapDecoder(Context context) {
        Hashtable<DecodeHintType, Object> hints = new Hashtable(2);
        Vector<BarcodeFormat> decodeFormats = new Vector();
        if (decodeFormats == null || decodeFormats.isEmpty()) {
            decodeFormats = new Vector();
            decodeFormats.addAll(DecodeFormatManager.ONE_D_FORMATS);
            decodeFormats.addAll(DecodeFormatManager.QR_CODE_FORMATS);
            decodeFormats.addAll(DecodeFormatManager.DATA_MATRIX_FORMATS);
        }

        hints.put(DecodeHintType.POSSIBLE_FORMATS, decodeFormats);
        hints.put(DecodeHintType.CHARACTER_SET, "UTF8");
        this.multiFormatReader.setHints(hints);
    }

    public Result getRawResult(Bitmap bitmap) {
        if (bitmap == null) {
            return null;
        } else {
            try {
                return this.multiFormatReader.decodeWithState(new BinaryBitmap(new HybridBinarizer(new BitmapLuminanceSource(bitmap))));
            } catch (NotFoundException var3) {
                var3.printStackTrace();
                return null;
            }
        }
    }
}

